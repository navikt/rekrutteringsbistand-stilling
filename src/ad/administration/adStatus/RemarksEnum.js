const RemarksEnum = {
    DISCRIMINATING: { value: 'DISCRIMINATING', label: 'Diskriminerende' },
    DUPLICATE: { value: 'DUPLICATE', label: 'Duplikat' },
    NO_EMPLOYMENT: { value: 'NO_EMPLOYMENT', label: 'Ikke ansatt' },
    NOT_APPROVED_BY_LABOUR_INSPECTION: { value: 'NOT_APPROVED_BY_LABOUR_INSPECTION', label: 'Ikke godkjent bemanning/renhold' },
    REJECT_BECAUSE_CAPACITY: { value: 'REJECT_BECAUSE_CAPACITY', label: 'Avvist pga kapasitet' },
    FOREIGN_JOB: { value: 'FOREIGN_JOB', label: 'Utenlandsk stilling' },
    COLLECTION_JOB: { value: 'COLLECTION_JOB', label: 'Samleannonse' },
    UNKNOWN: { value: 'UNKNOWN', label: 'Annet (skriv kommentar)' }
};

export default RemarksEnum;
