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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stormGlass_1 = require("@src/clients/stormGlass");
const stormglass_normalized_response_3_hours_json_1 = __importDefault(require("@test/fixtures/stormglass_normalized_response_3_hours.json"));
const stormglassWeatherPointFixture = __importStar(require("@test/fixtures/stormglass_weather_3_hours.json"));
const HTTPUtil = __importStar(require("@src/util/request"));
jest.mock('@src/util/request');
describe('StormGlass client', () => {
    const MockedRequestClass = HTTPUtil.Request;
    const mockedRequest = new HTTPUtil.Request();
    it('should return the normalized forecast from the StormGlass service', async () => {
        const lat = -33.792726;
        const lng = 151.289824;
        mockedRequest.get.mockResolvedValue({
            data: stormglassWeatherPointFixture,
        });
        const stormGlass = new stormGlass_1.StormGlass(mockedRequest);
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual(stormglass_normalized_response_3_hours_json_1.default);
    });
    it('should exclude incomplete data points', async () => {
        const lat = -33.792726;
        const lng = 151.289824;
        const incompleteResponse = {
            hours: [
                {
                    windDirection: {
                        noaa: 300,
                    },
                    time: '2020-04-26T00:00:00+00:00',
                },
            ],
        };
        mockedRequest.get.mockResolvedValue({
            data: incompleteResponse,
        });
        const stormGlass = new stormGlass_1.StormGlass(mockedRequest);
        const response = await stormGlass.fetchPoints(lat, lng);
        expect(response).toEqual([]);
    });
    it('should get a generic error from StormGlass service when the request fail before reaching the service', async () => {
        const lat = -33.792726;
        const lng = 151.289824;
        mockedRequest.get.mockRejectedValue({ message: 'Network Error' });
        const stormGlass = new stormGlass_1.StormGlass(mockedRequest);
        await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow('Unexpected error when trying to communicate to StormGlass: Network Error');
    });
    it('should get an StormGlassResponseError when the StormGlass service responds with error', async () => {
        const lat = -33.792726;
        const lng = 151.289824;
        mockedRequest.get.mockRejectedValue({
            response: {
                status: 429,
                data: { errors: ['Rate Limit reached'] },
            },
        });
        MockedRequestClass.isRequestError.mockReturnValue(true);
        const stormGlass = new stormGlass_1.StormGlass(mockedRequest);
        await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow('Unexpected error returned by the StormGlass service: Error: {"errors":["Rate Limit reached"]} Code: 429');
    });
});
//# sourceMappingURL=stormGlass.test.js.map