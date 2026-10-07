(function (global) {
    class InputRuleChain {
        constructor() {
            this._rules = {};
        }

        fieldName(name) { this._rules.name = name; return this; }
        required(val = true) { this._rules.required = val; return this; }
        length(val) { this._rules.length = val; return this; }
        between(min, max) { this._rules.between = { min: min, max: max }; return this; }
        date_range(min, max) { this._rules.date_range = { min: min, max: max }; return this; }
        date_compare(date1, date2) { this._rules.date_compare = { date1: date1, date2: date2 }; return this; }
        minlength(val) { this._rules.minlength = val; return this; }
        maxlength(val) { this._rules.maxlength = val; return this; }
        gt(val) { this._rules.gt = val; return this; }
        lt(val) { this._rules.lt = val; return this; }
        lte(val) { this._rules.lte = val; return this; }
        gte(val) { this._rules.gte = val; return this; }
        alphabet(val = true) { this._rules.alphabet = val; return this; }
        number(val = true) { this._rules.number = val; return this; }
        alphanumeric(val = true) { this._rules.alphanumeric = val; return this; }
        alphanumeric_with_space(val = true) { this._rules.alphanumeric_with_space = val; return this; }
        noSpecialChar(val = true) { this._rules.noSpecialChar = val; return this; }
        regex(val) { this._rules.regex = val; return this; }
        match(otherValue) { this._rules.match = otherValue; return this; }
        email(val = true) { this._rules.email = val; return this; }
        url(val = true) { this._rules.url = val; return this; }
        gst() { this._rules.gst = true; return this; }


        // Validate a string
        validate(value) {
            let val = value === undefined || value === null ? "" : String(value);
            const name = this._rules.name || "Field";
            console.log(val, val.length)

            if (this._rules.required && val.trim() === "") return `${name} Is Required.`;
            if (this._rules.length && val.length !== this._rules.length) return `${name} Must Contain ${this._rules.length} Characters.`;
            if (this._rules.minlength && val.length < this._rules.minlength) return `${name} Must Contain Atleast ${this._rules.minlength} Characters.`;
            if (this._rules.maxlength && val.length > this._rules.maxlength) return `${name} Cannot Contain More Than ${this._rules.maxlength} Characters.`;
            if (this._rules.between && (val.length < this._rules.between.min || val.length > this._rules.between.max)) { return `${name} Should Only Contain ${this._rules.between.min} to ${this._rules.between.max} Characters`; }
            if (this._rules.date_range) {
                const { min, max } = this._rules.date_range;
                const inputDate = new Date(val);
                const minDate = new Date(min);
                const maxDate = new Date(max);

                if (isNaN(inputDate.getTime())) {
                    return `${name} is not a valid date`;
                }

                if (inputDate < minDate || inputDate > maxDate) {
                    return `${name} must be between ${min} and ${max}`;
                }
            }
            if (this._rules.alphabet === true && /[^a-zA-Z\s]/.test(val)) return `${name} must only contain letters.`;
            if (this._rules.alphabet === false && /[a-zA-Z]/.test(val)) return `${name} must not contain letters.`;
            if (this._rules.number === true && /[^0-9]/.test(val)) return `${name} Must Only Contain Numbers.`;
            if (this._rules.number === false && /[0-9]/.test(val)) return `${name} must not contain numbers.`;
            if (this._rules.gt !== undefined && val <= this._rules.gt) {
                return `${name} must be greater than ${this._rules.gt}.`;
            }

            // Less Than
            if (this._rules.lt !== undefined && val >= this._rules.lt) {
                return `${name} must be less than ${this._rules.lt}.`;
            }

            // Greater Than or Equal
            if (this._rules.gte !== undefined && val < this._rules.gte) {
                return `${name} must be greater than or equal to ${this._rules.gte}.`;
            }

            // Less Than or Equal
            if (this._rules.lte !== undefined && val > this._rules.lte) {
                return `${name} must be less than or equal to ${this._rules.lte}.`;
            }
            if (this._rules.alphanumeric === true && /[^a-zA-Z0-9]/.test(val)) return `${name} must only contain letters and numbers.`;
            if (this._rules.alphanumeric_with_space === true && /[^a-zA-Z0-9 ]/.test(val)) return `${name} must only contain letters, space and numbers.`;
            if (this._rules.noSpecialChar === true && /[^a-zA-Z0-9\s]/.test(val)) return `${name} must not contain special characters.`;
            if (this._rules.regex && !(new RegExp(this._rules.regex).test(val))) return `${name} does not match the required format.`;
            if (this._rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return `Invalid Email Format.`;
            if (this._rules.url && !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,24}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(val)) return `Invalid URL Format.`;
            if (this._rules.match && val !== this._rules.match) return `${name} does not match.`;
            if (this._rules.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(val)) return `Invalid GST Format`;




            return null; // valid
        }


    }

    // Node.js export
    if (typeof module !== "undefined" && module.exports) {
        module.exports = InputRuleChain;
    } else {
        // Browser global
        global.InputRuleChain = InputRuleChain;
    }
})(this);
