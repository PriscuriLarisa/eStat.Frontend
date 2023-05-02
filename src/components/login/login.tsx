import { DefaultButton, TextField } from "@fluentui/react"
import { backgroundContainerClassName, backgroundImageClassName, fieldsContainerClassName, loginButtonStyle, loginContainerClassName, logoImageClassName, registerButtonStyle, registerContainerClassName, secondaryTitleClassName, textClassName, textFieldStyles, titleClassName } from "./login.styles"
import { LOGIN_BUTTON_TEXT, PASSWORD_FIELD_LABEL, USERNAME_FIELD_LABEL } from "../../library/constants"

export const Login = (): JSX.Element => {
    return (<>
    <div className={backgroundContainerClassName}>
        <div className={loginContainerClassName}>
            <img src="../../../eStat_logo.png" className={logoImageClassName}></img>
            <img src="../../../login_background_image.png" className={backgroundImageClassName}></img>
            <div className={fieldsContainerClassName}>
                <h1 className={titleClassName}>Login</h1>
                <TextField
                        label={USERNAME_FIELD_LABEL}
                        styles={textFieldStyles}
                        borderless
                        underlined
                        //value={username}
                        //onChange={handleUsernameChange}
                        //errorMessage={usernameErrorMessage}
                />
                <TextField
                        label={PASSWORD_FIELD_LABEL}
                        styles={textFieldStyles}
                        borderless
                        underlined
                        type="password"
                        //value={password}
                        //onChange={handlePasswordChange}
                        //errorMessage={passwordErrorMessage}
                />
                 <DefaultButton text={LOGIN_BUTTON_TEXT} /*onClick={onLoginButtonClick}*/ styles={loginButtonStyle} />
            </div>
        </div>
        <div className={registerContainerClassName}>
        <h1 className={secondaryTitleClassName}>Don't have an account yet?</h1>
                <h2 className={textClassName}>Create one here</h2>
                <DefaultButton text="Register" /*onClick={onRegisterButtonClick}*/ styles={registerButtonStyle} />
        </div>

    </div>
    </>)
}