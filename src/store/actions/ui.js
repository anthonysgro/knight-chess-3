export const RENDER_CARD_BACKGROUND = "RENDER_CARD_BACKGROUND";
export const REMOVE_CARD_BACKGROUND = "REMOVE_CARD_BACKGROUND";

export const renderCardBackground = () => {
    return {
        type: RENDER_CARD_BACKGROUND,
    };
};

export const removeCardBackground = () => {
    return {
        type: REMOVE_CARD_BACKGROUND,
    };
};
