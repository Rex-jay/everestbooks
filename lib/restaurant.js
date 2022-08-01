"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = exports.restaurantSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
exports.restaurantSchema = new mongoose_1.default.Schema({
    address: [String],
    borough: String,
    cuisine: String,
    grades: [String],
    name: String,
    restaurant_id: String
});
exports.Restaurant = mongoose_1.default.model('Restaurant', exports.restaurantSchema);
const yesman = () => __awaiter(void 0, void 0, void 0, function* () {
    const reg_contain = exports.Restaurant.find({ name: 'Bronx' }).or([{ cuisine: 'American' }, { cuisine: 'Chinese Dish' }]);
    console.log(reg_contain);
});
yesman();
