export const getSizeComponentLabel = (orderItem) => {
    const size = orderItem.sizeAvailability?.size ?? 'n/a';

    return 'size: ' + size;
};