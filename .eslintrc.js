module.exports = {
    extends: ["airbnb-base"],
    parser: "babel-eslint",
    env: {
        mocha: true
    },
    rules: {
        "linebreak-style": [
            "error",
            process.env.NODE_ENV === "prod" ? "unix" : "windows"
        ],
        "no-restricted-globals": "off",
        "consistent-return": "off"
        "import/prefer-default-export": "import/prefer-default-export"
    }
};