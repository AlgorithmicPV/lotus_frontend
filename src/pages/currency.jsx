import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../assets/styles/currency.css";
import axios from "axios";
import Logo from "../components/logo";
import exchage_icon from "../assets/icons/exchange.svg";
import delete_ico from "../assets/icons/delete.svg";

function Currencypage() {
  const [value, setValue] = useState();
  const [country, setCountry] = useState("");
  const [lkr_to_other_amt, setLkr_to_other_amt] = useState();
  const [flip_value, setFlip_value] = useState();
  const [flip_country, setFlip_country] = useState();
  const [other_to_lkr_amt, setOther_to_lkr_amt] = useState();
  const [fclassName, setFclassName] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [mode, setMode] = useState("lk_to_other");

  const countries = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "ANG", name: "Netherlands Antillean Guilder" },
    { code: "AOA", name: "Angolan Kwanza" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "AWG", name: "Aruban Florin" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "BAM", name: "Bosnia and Herzegovina Convertible Mark" },
    { code: "BBD", name: "Barbadian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "BIF", name: "Burundian Franc" },
    { code: "BMD", name: "Bermudian Dollar" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BOB", name: "Bolivian Boliviano" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BSD", name: "Bahamian Dollar" },
    { code: "BTN", name: "Bhutanese Ngultrum" },
    { code: "BWP", name: "Botswana Pula" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "BZD", name: "Belize Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CDF", name: "Congolese Franc" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CRC", name: "Costa Rican Colón" },
    { code: "CUP", name: "Cuban Peso" },
    { code: "CVE", name: "Cape Verdean Escudo" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DJF", name: "Djiboutian Franc" },
    { code: "DKK", name: "Danish Krone" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "ERN", name: "Eritrean Nakfa" },
    { code: "ETB", name: "Ethiopian Birr" },
    { code: "EUR", name: "Euro" },
    { code: "FJD", name: "Fijian Dollar" },
    { code: "FKP", name: "Falkland Islands Pound" },
    { code: "FOK", name: "Faroese Króna" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "GGP", name: "Guernsey Pound" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "GIP", name: "Gibraltar Pound" },
    { code: "GMD", name: "Gambian Dalasi" },
    { code: "GNF", name: "Guinean Franc" },
    { code: "GTQ", name: "Guatemalan Quetzal" },
    { code: "GYD", name: "Guyanese Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HNL", name: "Honduran Lempira" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HTG", name: "Haitian Gourde" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "IMP", name: "Isle of Man Pound" },
    { code: "INR", name: "Indian Rupee" },
    { code: "IQD", name: "Iraqi Dinar" },
    { code: "IRR", name: "Iranian Rial" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "JEP", name: "Jersey Pound" },
    { code: "JMD", name: "Jamaican Dollar" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "KGS", name: "Kyrgyzstani Som" },
    { code: "KHR", name: "Cambodian Riel" },
    { code: "KID", name: "Kiribati Dollar" },
    { code: "KMF", name: "Comorian Franc" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "KYD", name: "Cayman Islands Dollar" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "LAK", name: "Lao Kip" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "LRD", name: "Liberian Dollar" },
    { code: "LSL", name: "Lesotho Loti" },
    { code: "LYD", name: "Libyan Dinar" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "MDL", name: "Moldovan Leu" },
    { code: "MGA", name: "Malagasy Ariary" },
    { code: "MKD", name: "Macedonian Denar" },
    { code: "MMK", name: "Myanmar Kyat" },
    { code: "MNT", name: "Mongolian Tögrög" },
    { code: "MOP", name: "Macanese Pataca" },
    { code: "MRU", name: "Mauritanian Ouguiya" },
    { code: "MUR", name: "Mauritian Rupee" },
    { code: "MVR", name: "Maldivian Rufiyaa" },
    { code: "MWK", name: "Malawian Kwacha" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "MZN", name: "Mozambican Metical" },
    { code: "NAD", name: "Namibian Dollar" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "NIO", name: "Nicaraguan Córdoba" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "PAB", name: "Panamanian Balboa" },
    { code: "PEN", name: "Peruvian Sol" },
    { code: "PGK", name: "Papua New Guinean Kina" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Złoty" },
    { code: "PYG", name: "Paraguayan Guaraní" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RSD", name: "Serbian Dinar" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "RWF", name: "Rwandan Franc" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SBD", name: "Solomon Islands Dollar" },
    { code: "SCR", name: "Seychellois Rupee" },
    { code: "SDG", name: "Sudanese Pound" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "SHP", name: "Saint Helena Pound" },
    { code: "SLE", name: "Sierra Leonean Leone" },
    { code: "SLL", name: "Sierra Leonean Leone" },
    { code: "SOS", name: "Somali Shilling" },
    { code: "SRD", name: "Surinamese Dollar" },
    { code: "SSP", name: "South Sudanese Pound" },
    { code: "STN", name: "São Tomé and Príncipe Dobra" },
    { code: "SYP", name: "Syrian Pound" },
    { code: "SZL", name: "Eswatini Lilangeni" },
    { code: "THB", name: "Thai Baht" },
    { code: "TJS", name: "Tajikistani Somoni" },
    { code: "TMT", name: "Turkmenistani Manat" },
    { code: "TND", name: "Tunisian Dinar" },
    { code: "TOP", name: "Tongan Paʻanga" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TTD", name: "Trinidad and Tobago Dollar" },
    { code: "TVD", name: "Tuvaluan Dollar" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "TZS", name: "Tanzanian Shilling" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "USD", name: "United States Dollar" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "UZS", name: "Uzbekistani Som" },
    { code: "VES", name: "Venezuelan Bolívar Soberano" },
    { code: "VND", name: "Vietnamese Đồng" },
    { code: "VUV", name: "Vanuatu Vatu" },
    { code: "WST", name: "Samoan Tālā" },
    { code: "XAF", name: "Central African CFA Franc" },
    { code: "XCD", name: "East Caribbean Dollar" },
    { code: "XDR", name: "Special Drawing Rights" },
    { code: "XOF", name: "West African CFA Franc" },
    { code: "XPF", name: "CFP Franc" },
    { code: "YER", name: "Yemeni Rial" },
    { code: "ZAR", name: "South African Rand" },
    { code: "ZMW", name: "Zambian Kwacha" },
    { code: "ZWL", name: "Zimbabwean Dollar" },
  ];

  useEffect(() => {
    let convert = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/lkr"
        );
        if (value) {
          if (country == "") {
            const rates = response.data.rates;
            const selectedRate = rates["AED"];
            var amt = +value * selectedRate;
            amt = amt.toFixed(2);
            setLkr_to_other_amt(amt);
            console.log(amt);
          } else {
            const rates = response.data.rates;
            const selectedRate = rates[country];
            var amt = +value * selectedRate;
            amt = amt.toFixed(2);
            setLkr_to_other_amt(amt);
            console.log(amt);
          }
        } else {
          setLkr_to_other_amt(0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    convert();
  }, [value, country]);

  useEffect(() => {
    let flip_convert = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/lkr"
        );
        if (flip_value) {
          console.log(flip_country);
          if (country == "") {
            const rates = response.data.rates;
            const selectedRate = rates["AED"];
            console.log(selectedRate);

            var amt = +flip_value / selectedRate;
            amt = amt.toFixed(2);
            setOther_to_lkr_amt(amt);
            console.log(amt);
          } else {
            const rates = response.data.rates;
            const selectedRate = rates[country];
            var amt = +flip_value / selectedRate;
            amt = amt.toFixed(2);
            setOther_to_lkr_amt(amt);
            console.log(amt);
          }
        } else {
          setOther_to_lkr_amt(0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    flip_convert();
  }, [flip_value, flip_country]);

  let flip = () => {
    if (mode == "lk_to_other") {
      setFclassName("currency-main-box");
      setMode("other_to_lk");
      setSclassName("hide");
    } else if (mode == "other_to_lk") {
      setFclassName("hide");
      setMode("lk_to_other");
      setSclassName("currency-main-box");
    }
  };

  useEffect(() => {
    {
      if (mode == "lk_to_other") {
        setFclassName("currency-main-box");
        setMode("other_to_lk");
        setSclassName("hide");
      } else if (mode == "other_to_lk") {
        setFclassName("hide");
        setMode("lk_to_other");
        setSclassName("currency-main-box");
      }
    }
  }, []);

  let delete_value = () => {
    if (mode == "other_to_lk") {
      setValue("");
    } else if (mode == "lk_to_other") {
      setFlip_value("");
    }
  };

  return (
    <>
      <motion.div
        className="currency-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="currency-header">
          <div className="space-chat"></div>
          <Logo />
        </div>
        <div className="currency-body">
          <p className="title">Lotus Currency Converter</p>
          <div className={fclassName}>
            <div className="sub-cont">
              <div className="lkr-cont">
                <p className="amt-title">Amount</p>
                <div className="lkr-sub-two">
                  <div className="sl-country-details">
                    <p className="sl-txt">Sri Lankan Rupees</p>
                    <button onClick={delete_value} className="delete">
                      <img src={delete_ico} alt="" />
                    </button>
                  </div>
                  <input
                    placeholder="0"
                    type="number"
                    className="lk-amt"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={flip} className="exchange-btn">
                <img src={exchage_icon} />
              </button>
              <div className="other-cont">
                <p className="converted-amt-title">Converted Amount</p>
                <div className="other-country-sub-two">
                  <div className="other-country-detail">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      id="country"
                      name="country"
                    >
                      {countries.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="output-currency">{lkr_to_other_amt}</p>
                </div>
              </div>
            </div>
          </div>
          {/* flip */}
          <div className={sclassName}>
            <div className="sub-cont">
              <div className="other-cont">
                <p className="amt-title">Amount</p>
                <div className="other-country-sub-two">
                  <div className="other-country-detail">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      id="country"
                      name="country"
                    >
                      {countries.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <button onClick={delete_value} className="delete">
                      <img src={delete_ico} alt="" />
                    </button>
                  </div>
                  <input
                    placeholder="0"
                    type="number"
                    className="lk-amt"
                    value={flip_value}
                    onChange={(e) => setFlip_value(e.target.value)}
                  />
                </div>
              </div>
              <button onClick={flip} className="exchange-btn">
                <img src={exchage_icon} />
              </button>
              <div className="lkr-cont">
                <p className="converted-amt-title">Converted Amount</p>
                <div className="lkr-sub-two">
                  <div className="sl-country-details">
                    <p className="sl-txt">Sri Lankan Rupees</p>
                  </div>
                  <p className="output-currency">{other_to_lkr_amt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Currencypage;
