
export const toPersianNumber = (v) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return v.toString().replace(/\d/g, (x) => farsiDigits[x]);
}

export const toEnglishNumber = (v) => {
    return v.replace(/[۰-۹]/g, (x) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(x));
}