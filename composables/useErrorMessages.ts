import { useI18n } from "#imports";

export function useErrorMessages() {
  const { t } = useI18n();

  return {
    donorNameRequired: () => t("donationErrors.donorNameRequired"),
    amountRequired: () => t("donationErrors.amountRequired"),
    amountInvalid: () => t("donationErrors.amountInvalid"),
    startDateRequired: () => t("donationErrors.startDateRequired"),
    recurringTypeRequired: () => t("donationErrors.recurringTypeRequired"),
    submissionRequired: () => t("donationErrors.submissionRequired"),
    generalSubmissionError: () => t("donationErrors.generalSubmissionError"),
  };
}
