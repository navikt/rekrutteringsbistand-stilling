export const ActiveAdStatusEnum = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    STOPPED: 'STOPPED',
};

const AdStatusEnum = {
    ...ActiveAdStatusEnum,
    REJECTED: 'REJECTED',
    DELETED: 'DELETED',
};

export default AdStatusEnum;
