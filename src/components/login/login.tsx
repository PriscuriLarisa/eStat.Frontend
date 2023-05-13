import { DefaultButton, TextField } from "@fluentui/react"
import { backgroundContainerClassName, backgroundImageClassName, errorClassName, fieldsContainerClassName, loginButtonStyle, loginContainerClassName, logoImageClassName, registerButtonStyle, registerContainerClassName, secondaryTitleClassName, textClassName, textFieldStyles, titleClassName } from "./login.styles"
import { LOGIN_BUTTON_TEXT, PASSWORD_FIELD_LABEL, USERNAME_FIELD_LABEL } from "../../library/constants"
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [displayError, setDisplayError] = useState<boolean>(false);

    const onRegisterButtonClick = (): void => {
        navigate('/register');
    };

    const onUsernameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setDisplayError(false);
        setUsername(newValue ?? "");
    };

    const onPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setPassword(newValue ?? "");
    };

    return (<>
        <div className={backgroundContainerClassName}>
            <div className={loginContainerClassName}>
                <img src="../../../logo_recolored.png" className={logoImageClassName}></img>
                <img src="../../../background_graph_image.png" className={backgroundImageClassName}></img>
                <div className={fieldsContainerClassName}>
                    <h1 className={titleClassName}>Login</h1>
                    {displayError && <p className={errorClassName}>Wrong credentials.</p>}
                    <TextField
                        label={USERNAME_FIELD_LABEL}
                        styles={textFieldStyles}
                        borderless
                        underlined
                    value={username}
                    onChange={onUsernameChange}
                    />
                    <TextField
                        label={PASSWORD_FIELD_LABEL}
                        styles={textFieldStyles}
                        borderless
                        underlined
                        type="password"
                    value={password}
                    onChange={onPasswordChange}
                    />
                    <DefaultButton text={LOGIN_BUTTON_TEXT} /*onClick={onLoginButtonClick}*/ styles={loginButtonStyle} />
                </div>
            </div>
            <div className={registerContainerClassName}>
                <h1 className={secondaryTitleClassName}>Don't have an account yet?</h1>
                <h2 className={textClassName}>Create one here</h2>
                <DefaultButton text="Register" onClick={onRegisterButtonClick} styles={registerButtonStyle} />
            </div>

        </div>
    </>)
}