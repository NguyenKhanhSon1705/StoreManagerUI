import request from "./axios";
const { default: validateInput } = require("./validInput");

const utils = {
    validateInput,
    request
}
export default utils