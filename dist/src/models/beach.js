"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beach = exports.BeachPosition = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var BeachPosition;
(function (BeachPosition) {
    BeachPosition["S"] = "S";
    BeachPosition["E"] = "E";
    BeachPosition["W"] = "W";
    BeachPosition["N"] = "N";
})(BeachPosition = exports.BeachPosition || (exports.BeachPosition = {}));
const schema = new mongoose_1.default.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    toJSON: {
        transform: (_, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
});
exports.Beach = mongoose_1.default.model('Beach', schema);
//# sourceMappingURL=beach.js.map