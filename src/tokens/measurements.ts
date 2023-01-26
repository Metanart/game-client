const Millisecond = 1;
const Meter = 1;
const Gram = 1;
const Liter = 1;

const Second = Millisecond * 1000;
const Minute = Second * 60;
const Hour = Minute * 60;
const Day = Hour * 24;
const Week = Day * 7;
const Month = Week * 4;
const Year = Month * 12;

export const TK_Time = {
    Millisecond,
    Second,
    Minute,
    Hour,
    Day,
    Week,
    Month,
    Year,
};

export const TK_Length = {
    Millimeter: Meter / 1000,
    Centimeter: Meter / 100,
    Decimeter: Meter / 10,
    Meter,
    Dekameter: Meter * 10,
    Hectometer: Meter * 100,
    Kilometer: Meter * 1000,
};

export const TK_Weight = {
    Milligram: Gram / 1000,
    Centigram: Gram / 100,
    Decigram: Gram / 10,
    Gram,
    Dekagram: Gram * 10,
    Hectogram: Gram * 100,
    Kilogram: Gram * 1000,
};

export const TK_Volume = {
    Milliliter: Gram / 1000,
    Centiliter: Gram / 100,
    Deciliter: Gram / 10,
    Liter,
    Dekaliter: Gram * 10,
    Hectoliter: Gram * 100,
    Kiloliter: Gram * 1000,
};
