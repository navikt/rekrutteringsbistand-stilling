export const FiltrerbarAdStatusEnum = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    STOPPED: 'STOPPED',
};

const AdStatusEnum = {
    ...FiltrerbarAdStatusEnum,
    REJECTED: 'REJECTED',
    DELETED: 'DELETED',
};

export default AdStatusEnum;
