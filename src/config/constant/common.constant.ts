export const Constant = {
    DEFAULT_AVATAR:
        "https://cdn4.iconfinder.com/data/icons/people-avatar-filled-outline/64/boy_people._avatar_man_male_teenager_user_-64.png",
    STRING_NUM_SPACE_PATTERN: "^[a-zA-Z0-9 _-]+$",
    STRING_NUM_PATTERN: `^-?\\d+(\\.\\d+)?$`, //^[0-9.]+$
    STRING_NUM_PATTERN_NON_NEG: `^\\d+(\\.\\d+)?$`, //^[0-9.]+$
    MAX_NUM_AMOUNT: 1_000_000, // one million
    PAGE_SIZE: 10,
} as const
