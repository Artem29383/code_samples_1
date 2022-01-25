import { Methods, request } from 'api/request';

export const getGroupTours = (data: {
  time_range: string;
  tour_month: string;
  tour_range_start?: string;
  tour_range_finish?: string;
}) => {
  return request(Methods.GET, {
    url: `/requests/tours/${data.time_range}/date_grouped${
      data.tour_month ? `?tour_month=${data.tour_month}` : ''
    }${
      data.tour_range_start
        ? `${data.tour_month ? '&' : '?'}tour_range_start=${
            data.tour_range_start
          }`
        : ''
    }${
      data.tour_range_finish
        ? `&tour_range_finish=${data.tour_range_finish}`
        : ''
    }`,
  });
};

export const getToursDate = (data: { period: string; date: string }) => {
  return request(Methods.GET, {
    url: `/requests/tours/${data.period}?tour_date=${data.date}`,
  });
};

export const updateNoteTour = (data: { note: string | null; id: string }) =>
  request(Methods.PUT, {
    headers: {
      'Content-Type': 'application/json',
    },
    url: `/requests/tours/${data.id}`,
    data: {
      note: data.note,
    },
  });
