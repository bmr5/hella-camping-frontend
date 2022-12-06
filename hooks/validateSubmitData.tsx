import { Session } from "next-auth";
import type { Range } from "../calendar_utils/CalendarUtils";

type Params = {
  parkID: number | undefined;
  stayLength: number | undefined;
  dateRange: Range;
  campgroundIDs: number[];
  session: Session | null;
};

type submitData = {
  campgroundIDs: number[];
  dateRange: {
    startDate: string;
    endDate: string;
  };
  stayLength: number;
  parkID: number;
  userEmail: string;
};

function validateSubmitData({
  parkID,
  stayLength,
  campgroundIDs,
  dateRange,
  session,
}: Params): submitData | null {
  if (parkID === undefined) {
    return null;
  }
  if (session == undefined || session?.user?.email == undefined) {
    return null;
  }
  if (stayLength === undefined || stayLength <= 0) {
    return null;
  }
  if (campgroundIDs.length === 0) {
    return null;
  }
  if (dateRange.startDate == null || dateRange.endDate == null) {
    return null;
  }

  let newDates = {
    startDate: dateRange.startDate.toUTCString(),
    endDate: dateRange.endDate.toUTCString(),
  };

  return {
    parkID,
    campgroundIDs,
    stayLength,
    userEmail: session.user.email,
    dateRange: newDates,
  };
}

export default validateSubmitData;
