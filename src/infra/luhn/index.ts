"use strict";

/**
 * Check if strToTest with Luhn algorithm
 * 
 * @param {string} strToTest 
 * @param {number} multiple
 * @return {number} the correct number of checksum 
 */

function checkLuhn(strToTest: string, multiple = 10): number
{
    let digit = 0;
    let sum = 0;
    const length: number = strToTest.length;
    let odd = false;

    for (let i: number = (length - 1); i >= 0; i--)
    {
        digit = parseInt(strToTest[i], 10) | 0;

        if (odd === true)
        {
            digit = digit * 2 | 0; 
        }
        if (digit > 9)
        {
            digit = digit - 9;
        }
        odd = !odd;
        sum += digit;
    }
    const res: number = sum % multiple;
    if (res === 0)
    {
        return 0;
    }
    return multiple - (res);
}

/**
 * Corrected strToTest
 * @param {string} strToTest 
 * @param {number} multiple
 * @return {string} valid Luhn 
 */
function correctedLuhn(strToTest: string, multiple = 10): string
{
    const ret: number = checkLuhn(strToTest, multiple);
    
    if (ret !== 0)
    {
        const digit = parseInt(strToTest[(strToTest.length - 1)]);
        if ((digit + ret) > 9)
        {
            throw new Error("Too much number to corrected");
        }
        const copy = strToTest.substr(0, strToTest.length - 1);
        return copy.concat((digit + ret).toString());
    }
    
    return strToTest;
}

/**
 * 
 * @param {string} strToTest 
 * @param {number} multiple
 * @return {number[]} 
 */
function computeCheckSumControl(strToTest: string, multiple = 10): number[]
{
    const ret: number[] = [];
    let i = 0;
    let checkSumTest = 0;
    let copy: string;

    while(i < 10)
    {
        copy = String(strToTest).concat(i.toString());
        checkSumTest = checkLuhn(copy, multiple) | 0;
        i += checkSumTest;      
        if (i < 10)
        {
            ret.push(i);
            i++;
        }
    }

    return ret;
}

/**
 * Return false if strToTest is empty or checkLuhn not equals 0 
 * @param {string} strToTest 
 * @param {number} multiple 
 * @return {boolean}
 */
function isLuhnValid(strToTest: string, multiple = 10): boolean
{
    if (strToTest.length === 0)
    {
        return false;
    }

    const ret:boolean = (checkLuhn(strToTest, multiple) === 0);
    return ret;
}

/**
 * return a clean copy of strTotest 
 * @param {string} strToTest
 * @return {string} 
 */
function cleanProposed(strToTest: string): string
{
    const cleanStr: string = String(strToTest).replace(/[^\d]/g, "");

    return cleanStr;
}

export { isLuhnValid };
export { checkLuhn };
export { computeCheckSumControl };
export { correctedLuhn };
export { cleanProposed };
