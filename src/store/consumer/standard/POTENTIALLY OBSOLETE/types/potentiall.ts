export type UtilityConsentPayload = {
  status: "COMPLETED";
  completed: boolean;
  authorized: boolean;
  utilityId: string;
  commodityId: string;
  consentGiven: boolean;
  signedAt: string;
};
