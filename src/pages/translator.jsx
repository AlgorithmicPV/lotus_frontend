import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Logo from "../components/logo";
import "../assets/styles/tranlator.css";

function TranslatorPage() {
  const [lang, setLang] = useState("af");
  const [value, setValue] = useState("");
  const [lk_lang, setLk_lang] = useState("si");
  const [translated, setTranslated] = useState("Translation");
  const textareaRef = useRef(null);
  const outputRef = useRef(null);

  const languages = [
    { name: "Afrikaans", code: "af" },
    { name: "Albanian", code: "sq" },
    { name: "Amharic", code: "am" },
    { name: "Arabic", code: "ar" },
    { name: "Armenian", code: "hy" },
    { name: "Assamese", code: "as" },
    { name: "Aymara", code: "ay" },
    { name: "Azerbaijani", code: "az" },
    { name: "Bambara", code: "bm" },
    { name: "Basque", code: "eu" },
    { name: "Belarusian", code: "be" },
    { name: "Bengali", code: "bn" },
    { name: "Bhojpuri", code: "bho" },
    { name: "Bosnian", code: "bs" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Cebuano", code: "ceb" },
    { name: "Chichewa", code: "ny" },
    { name: "Chinese (simplified)", code: "zh-CN" },
    { name: "Chinese (traditional)", code: "zh-TW" },
    { name: "Corsican", code: "co" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dhivehi", code: "dv" },
    { name: "Dogri", code: "doi" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Esperanto", code: "eo" },
    { name: "Estonian", code: "et" },
    { name: "Ewe", code: "ee" },
    { name: "Filipino", code: "tl" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Frisian", code: "fy" },
    { name: "Galician", code: "gl" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Guarani", code: "gn" },
    { name: "Gujarati", code: "gu" },
    { name: "Haitian Creole", code: "ht" },
    { name: "Hausa", code: "ha" },
    { name: "Hawaiian", code: "haw" },
    { name: "Hebrew", code: "iw" },
    { name: "Hindi", code: "hi" },
    { name: "Hmong", code: "hmn" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Igbo", code: "ig" },
    { name: "Ilocano", code: "ilo" },
    { name: "Indonesian", code: "id" },
    { name: "Irish", code: "ga" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Javanese", code: "jw" },
    { name: "Kannada", code: "kn" },
    { name: "Kazakh", code: "kk" },
    { name: "Khmer", code: "km" },
    { name: "Kinyarwanda", code: "rw" },
    { name: "Konkani", code: "gom" },
    { name: "Korean", code: "ko" },
    { name: "Krio", code: "kri" },
    { name: "Kurdish (kurmanji)", code: "ku" },
    { name: "Kurdish (sorani)", code: "ckb" },
    { name: "Kyrgyz", code: "ky" },
    { name: "Lao", code: "lo" },
    { name: "Latin", code: "la" },
    { name: "Latvian", code: "lv" },
    { name: "Lingala", code: "ln" },
    { name: "Lithuanian", code: "lt" },
    { name: "Luganda", code: "lg" },
    { name: "Luxembourgish", code: "lb" },
    { name: "Macedonian", code: "mk" },
    { name: "Maithili", code: "mai" },
    { name: "Malagasy", code: "mg" },
    { name: "Malay", code: "ms" },
    { name: "Malayalam", code: "ml" },
    { name: "Maltese", code: "mt" },
    { name: "Maori", code: "mi" },
    { name: "Marathi", code: "mr" },
    { name: "Meiteilon (manipuri)", code: "mni-Mtei" },
    { name: "Mizo", code: "lus" },
    { name: "Mongolian", code: "mn" },
    { name: "Myanmar", code: "my" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Odia (oriya)", code: "or" },
    { name: "Oromo", code: "om" },
    { name: "Pashto", code: "ps" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Punjabi", code: "pa" },
    { name: "Quechua", code: "qu" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Samoan", code: "sm" },
    { name: "Sanskrit", code: "sa" },
    { name: "Scots Gaelic", code: "gd" },
    { name: "Sepedi", code: "nso" },
    { name: "Serbian", code: "sr" },
    { name: "Sesotho", code: "st" },
    { name: "Shona", code: "sn" },
    { name: "Sindhi", code: "sd" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Somali", code: "so" },
    { name: "Spanish", code: "es" },
    { name: "Sundanese", code: "su" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Tajik", code: "tg" },
    { name: "Tamil", code: "ta" },
    { name: "Tatar", code: "tt" },
    { name: "Telugu", code: "te" },
    { name: "Thai", code: "th" },
    { name: "Tigrinya", code: "ti" },
    { name: "Tsonga", code: "ts" },
    { name: "Turkish", code: "tr" },
    { name: "Turkmen", code: "tk" },
    { name: "Twi", code: "ak" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Uyghur", code: "ug" },
    { name: "Uzbek", code: "uz" },
    { name: "Vietnamese", code: "vi" },
    { name: "Welsh", code: "cy" },
    { name: "Xhosa", code: "xh" },
    { name: "Yiddish", code: "yi" },
    { name: "Yoruba", code: "yo" },
    { name: "Zulu", code: "zu" },
  ];

  const lk_languages = [
    { name: "Sinhala", code: "si" },
    { name: "Tamil", code: "ta" },
  ];

  useEffect(() => {
    console.log(lang);
    console.log(value);
    const data = {
      value: value,
      lang: lang,
      lk_lang: lk_lang,
    };
    axios
      .post("https://lotus-backend-jaek.onrender.com/lotus_translator", data)
      .then((response) => {
        console.log(response.data.translated_txt_from_server);
        setTranslated(response.data.translated_txt_from_server);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lang, value, lk_lang]);

  useEffect(() => {
    if (textareaRef.current && outputRef.current) {
      const textarea = textareaRef.current;
      const output = outputRef.current;

      textarea.style.height = "auto";
      output.style.height = "auto";

      const maxHeight = Math.max(textarea.scrollHeight, output.scrollHeight);

      textarea.style.height = `${maxHeight}px`;
      output.style.height = `${maxHeight}px`;
    }
  });
  return (
    <>
      <div className="space-chat"></div>
      <Logo />
      <div className="translator_body">
        <div className="translator-box">
          <div className="left-box">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              name="languages"
              id="languages"
            >
              {languages.map((item) => {
                return (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <textarea
              ref={textareaRef}
              rows="10"
              className="user-txt"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          </div>
          <div className="right-box">
            <select
              value={lk_lang}
              onChange={(e) => setLk_lang(e.target.value)}
              name="languages"
              id="languages"
            >
              {lk_languages.map((item) => {
                return (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <p ref={outputRef} className="output-translator">
              {translated}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TranslatorPage;
