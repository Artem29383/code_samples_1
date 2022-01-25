import React, { memo, useCallback, useEffect, useState } from 'react';
// @ts-ignore
import ReadMoreReact from 'read-more-react';

import { actions } from 'models/requests';
import { useActionWithPayload } from 'hooks/useAction';

import Text from 'components/Text';
import Cross from 'components/Cross';

import useToggle from 'hooks/useToggle';
import useDebounce from 'hooks/useDebounce';

import * as Styled from './Notes.styled';

type Props = {
  note: string | null;
  id: string;
};

let Component;

const Notes = ({ note, id }: Props) => {
  const [showNotes, setShowNotes] = useToggle(false);
  const [isEdit, setEdit] = useToggle(false);
  const [notes, setNotes] = useState(note || '');
  const debounceNote = useDebounce(notes, 500);
  const [showAutoSaving, setAutoSaving] = useState(false);
  const updateNotesTour = useActionWithPayload(actions.updateNotesTour);

  const handleEditNotes = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      if (e.target.value.length + 1 < 300) {
        setNotes(e.target.value);
      }
      if (!showNotes) {
        setShowNotes();
      }
    },
    [setShowNotes, showNotes]
  );

  const handlePreventNewLine = useCallback(
    (e: {
      keyCode: number;
      shiftKey: any;
      preventDefault: () => void;
      // eslint-disable-next-line consistent-return
    }) => {
      if (e.keyCode === 13 || (e.shiftKey && e.keyCode === 13)) {
        e.preventDefault();
        return false;
      }
    },
    []
  );

  useEffect(() => {
    if (isEdit && debounceNote) {
      updateNotesTour({
        id,
        note: debounceNote,
      });
      setAutoSaving(true);
    }
  }, [debounceNote, id, isEdit, updateNotesTour]);

  useEffect(() => {
    if (showAutoSaving) {
      setTimeout(() => {
        setAutoSaving(false);
      }, 2000);
    }
  }, [showAutoSaving]);

  if (note && showNotes) {
    Component = <Styled.Edit onClick={setEdit}>Edit</Styled.Edit>;
  } else if (!note) {
    Component = <Styled.AddNotes onClick={setEdit}>Add Notes</Styled.AddNotes>;
  } else {
    Component = (
      <Styled.AddNotes onClick={setShowNotes}>View Notes</Styled.AddNotes>
    );
  }

  return !isEdit ? (
    <Styled.Notes isEdit={showNotes}>
      {showNotes && (
        <Text
          fontSize={{ m: 14, d: 16 }}
          lineHeight={{ d: '23px', m: '18px' }}
          color="mineShaft"
          fontType="liberGrotesqueRegular"
        >
          <ReadMoreReact
            text={notes}
            min={80}
            ideal={130}
            max={150}
            readMoreText="Read More"
          />
        </Text>
      )}
      {Component}
    </Styled.Notes>
  ) : (
    <Styled.NotesEdit isEdit={showNotes || isEdit}>
      <Styled.TextArea
        onKeyDown={handlePreventNewLine}
        onChange={handleEditNotes}
        value={notes}
        rows={5}
        autoFocus
      />
      <Styled.AutoSaving showAutoSaving={showAutoSaving}>
        Auto-saving...
      </Styled.AutoSaving>
      <Cross
        position="absolute"
        top={10}
        right={10}
        size={14}
        onClick={setEdit}
      />
    </Styled.NotesEdit>
  );
};

export default memo(Notes);
