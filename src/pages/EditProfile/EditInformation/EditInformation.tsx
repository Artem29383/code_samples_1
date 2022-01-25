import React, { memo, useCallback } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import EditFieldSubmitting from 'pages/EditProfile/EditInformation/EditFieldSubmitting';

import * as Styled from './EditInformation.styled';

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onSubmitField: (p: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
};

const EditInformation = ({
  onSubmitField,
  firstName,
  lastName,
  email,
  phone,
}: Props) => {
  const onSubmit = useCallback(
    (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }) => {
      if (/^[a-zA-Z]+$/.test(data.firstName)) {
        onSubmitField({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
        });
      }
    },
    [onSubmitField]
  );

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        email,
        phone,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .required()
          .matches(/^[a-zA-Z]+$/),
        lastName: Yup.string()
          .required()
          .matches(/^[a-zA-Z]+$/),
        email: Yup.string()
          .required()
          .email(),
        phone: Yup.string().required(),
      })}
      onSubmit={onSubmit}
    >
      {({ handleBlur, handleSubmit }) => (
        <Styled.Form>
          <EditFieldSubmitting
            isSpaceBlocked
            minWidth={40}
            label="First Name"
            name="firstName"
            onSubmitField={handleSubmit}
            onBlur={handleBlur}
            division={{
              t: 1.7,
              m: 1.8,
            }}
            titleButton="Edit"
          />
          <EditFieldSubmitting
            isSpaceBlocked
            minWidth={40}
            label="Last Name"
            name="lastName"
            onSubmitField={handleSubmit}
            onBlur={handleBlur}
            division={{
              t: 1.7,
              m: 1.8,
            }}
            titleButton="Edit"
          />
          <EditFieldSubmitting
            isSpaceBlocked
            minWidth={40}
            label="Email"
            name="email"
            onSubmitField={handleSubmit}
            onBlur={handleBlur}
            division={{
              t: 1.7,
              m: 1.8,
            }}
            titleButton="Edit"
          />
          <EditFieldSubmitting
            isSpaceBlocked
            minWidth={40}
            label="Phone"
            name="phone"
            onSubmitField={handleSubmit}
            onBlur={handleBlur}
            division={{
              t: 1.7,
              m: 1.8,
            }}
            titleButton="Edit"
          />
        </Styled.Form>
      )}
    </Formik>
  );
};

export default memo(EditInformation);
