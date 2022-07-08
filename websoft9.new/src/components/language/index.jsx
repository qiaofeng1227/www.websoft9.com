import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import Dropdown from "@ui/dropdown";
import DropdownItem from "@ui/dropdown/dropdown-item";
import DropdownItemInner from "@ui/dropdown/dropdown-item-inner";
import DropdownSubMenu from "@ui/dropdown/dropdown-submenu";
import enFlag from "@assets/images/flags/en.png";
import zhFlag from "@assets/images/flags/zh.png";
import { LanguageWrap } from "./style";
import { useI18next } from 'gatsby-plugin-react-i18next';


const Language = ({ className, ...props }) => {
    const {languages, changeLanguage} = useI18next();

    const [language, setLanguage] = useState([
        {
            id: "en-US",
            flag: enFlag,
            name: "English",
            isActive: true,
        },
        {
            id: "zh-CN",
            flag: zhFlag,
            name: "简体中文",
            isActive: false,
        }
    ]);

    let activeLanguage = language.filter((el) => {
        return el.isActive;
    });

    let inActiveLanguage = language.filter((el) => {
        return !el.isActive;
    });

    const onClickHandler = (id) => {      
        const copiedState = [...language];
        const languageArr = copiedState.map((lang) => {           
            if (lang.id !== id) {
                return {
                    ...lang,
                    isActive: false,
                };
            }
            return {
                ...lang,
                isActive: true,
            };
        });     
        setLanguage(languageArr);
        changeLanguage(id);
    };

    return (
        <LanguageWrap className={cn(className, "lang-switcher")} {...props}>
            <Dropdown>
                <DropdownItem active>
                    <DropdownItemInner active>
                        <img
                            src={activeLanguage[0].flag}
                            alt={activeLanguage[0].name}
                        />
                        <span>{activeLanguage[0].name}</span>
                    </DropdownItemInner>
                    <DropdownSubMenu>
                        {inActiveLanguage.map((lang) => {
                            const { id, name,flag } = lang;
                            return (
                                <DropdownItem
                                    key={id}
                                    onClick={() => {onClickHandler(id);}}
                                >
                                    <DropdownItemInner>
                                        <img src={flag} alt={name} />
                                        <span>{name}</span>
                                    </DropdownItemInner>
                                </DropdownItem>
                            );
                        })}
                    </DropdownSubMenu>
                </DropdownItem>
            </Dropdown>
        </LanguageWrap>
    );
};

Language.propTypes = {
    className: PropTypes.string,
};

export default Language;
