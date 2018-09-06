//http://data.fixer.io/api/latest?access_key=a4906b9a75c87017d0a75671e97c3b73&format=1

const axios = require('axios');

const getExchangeRate = async (from, to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=a4906b9a75c87017d0a75671e97c3b73&format=1')
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
}

const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
}

const convertCurrency = async (from, to, amount) => {
    const exchangeRate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    return `${amount} ${from} is worth ${(amount * exchangeRate).toFixed(2)} ${to} that is accepted in ${countries.join(', ')}`;
}

// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// }).catch((e) => {
//     console.log(e)
// })

// getCountries('EUR').then((countries) => {
//     console.log(countries);
// })

convertCurrency('CAD', 'USD', 100).then((amount) => {
    console.log(amount);
})