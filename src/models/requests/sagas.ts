import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { format, parseISO } from 'date-fns';

import { Tour } from 'models/requests/types';

import { actions } from 'models/requests';

import { delayRequest, request } from 'utils/call';
import pickToCamelCase from 'utils/pickToCamelCase';
import { normalize } from 'utils/normalizeById';
import toCamelCase from 'utils/toCamelCase';

import * as api from 'api/requests';

function* getGroupTours({ payload }: PayloadAction<{ tour_month: string }>) {
  try {
    const response1 = yield request(api.getGroupTours, {
      ...payload,
      time_range: 'upcoming',
    });
    const response2 = yield request(api.getGroupTours, {
      ...payload,
      time_range: 'past',
    });
    const upcoming = response1.data.requests_date_groups.map((tour: Tour) => {
      const tourUp = pickToCamelCase(tour, [
        'start_tour_request',
        'tour_requests_count',
      ]);
      return { ...tourUp, timeRange: 'upcoming' };
    });
    const past = response2.data.requests_date_groups.map((tour: Tour) => {
      const tourUp = pickToCamelCase(tour, [
        'start_tour_request',
        'tour_requests_count',
      ]);
      return { ...tourUp, timeRange: 'past' };
    });
    const tours = [...upcoming, ...past];
    const toursReduce = tours.reduce((acc, tour) => {
      const date = format(
        parseISO(tour.startTourRequest.propertyTour.tourDate),
        'd'
      );
      acc[date] = tour;
      return acc;
    }, {});
    yield put({
      type: actions.setGroupTours.type,
      payload: toursReduce,
    });
    yield put({
      type: actions.setLoad.type,
      payload: false,
    });
  } catch (err) {
    console.error(err);
  }
}

function* getToursCurrentDate({
  payload,
}: PayloadAction<{
  period: string;
  date: string;
}>) {
  try {
    const response = yield delayRequest(api.getToursDate, payload);
    const entities = normalize(response.data.requests);
    const ids = Object.keys(entities);
    yield put({
      type: actions.setToursCurrentDate.type,
      payload: {
        collection: toCamelCase(entities),
        ids,
      },
    });
    yield put({
      type: actions.setLoad.type,
      payload: false,
    });
  } catch (err) {
    console.error(err);
  }
}

function* updateNoteTour({
  payload,
}: PayloadAction<{
  note: string | null;
  id: string;
}>) {
  try {
    const response = yield request(api.updateNoteTour, payload);
    const tour = toCamelCase(response.data);
    yield put({
      type: actions.setUpdateTour.type,
      payload: {
        tour,
        id: payload.id,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield takeLatest(actions.getGroupTours.type, getGroupTours);
  yield takeLatest(actions.getToursCurrentDate.type, getToursCurrentDate);
  yield takeLatest(actions.updateNotesTour.type, updateNoteTour);
}
