import { DefaultButton, Dropdown, IDropdownOption, TextField } from "@fluentui/react"
import { backgroundContainerClassName, backgroundImageClassName, dropdownStyles, errorClassName, fieldsContainerClassName, largeTextFieldStyles, loginButtonStyle, loginContainerClassName, logoImageClassName, registerButtonStyle, registerContainerClassName, secondaryTitleClassName, textClassName, textFieldStyles, titleClassName } from "./register.styles"
import { PASSWORD_FIELD_LABEL, USERNAME_FIELD_LABEL } from "../../library/constants"
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Roles } from "../../enums/roles";


const options: IDropdownOption[] = [
    { key: 'Retailer', text: 'Retailer'},
    { key: 'Purchaser', text: 'Purchaser'},
];

export const Register = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const [displayError, setDisplayError] = useState<boolean>(false);
    const [role, setRole] = useState<Roles>(Roles.Purchaser);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfim] = useState<string>("");
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const [confirmErrorMessage, setConfirmErrorMessage] = useState<string>("");

    const onLoginButtonClick = (): void => {
        navigate('/login');
    };

    const onUsernameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setDisplayError(false);
        setUsernameErrorMessage(newValue ? "" : "The email field cannot be empty.")
        setUsername(newValue ?? "");
    };

    const onPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setPasswordErrorMessage(newValue ? "" : "The password field cannot be empty.")
        if(newValue !== confirm && confirm && newValue) 
            setConfirmErrorMessage("The passwords do not match.");
        setPassword(newValue ?? "");
    };

    const onConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setConfirmErrorMessage(newValue ? "" : "The password field cannot be empty.")
        if(newValue! !== password && password && newValue) 
            setConfirmErrorMessage("The passwords do not match.");
        setConfim(newValue ?? "");
    };

    const onRoleChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any> | undefined, index?: number | undefined): void => {
        setRole(option!.key! as Roles);
    };

    const onRegisterClicked = (): void => {
        console.log(`${username} ${password} ${confirm} ${role} `)
        if(!username || !password || !confirm || !role)
            return;
        setDisplayError(true);
        console.log('register');
    };

    return (<>
        <div className={backgroundContainerClassName}>
            <div className={loginContainerClassName}>
                <img src="../../../logo_recolored.png" className={logoImageClassName}></img>
                <img src="../../../background_graph_image.png" className={backgroundImageClassName}></img>
                <div className={fieldsContainerClassName}>
                    <h1 className={titleClassName}>Register</h1>
                    {displayError && <p className={errorClassName}>The email is already in use.</p>}
                    <Dropdown
                        placeholder="Select an option"
                        label="What type of user are you?"
                        ariaLabel="Custom dropdown label example"
                        styles={dropdownStyles}
                        options={options} 
                        defaultSelectedKey={'Purchaser'}
                        onChange={onRoleChanged}/>
                    <TextField
                        label={USERNAME_FIELD_LABEL}
                        styles={textFieldStyles}
                        borderless
                        underlined
                    value={username}
                    onChange={onUsernameChange}
                    errorMessage={usernameErrorMessage}
                    />
                    <TextField
                        label={PASSWORD_FIELD_LABEL}
                        styles={textFieldStyles}
                        borderless
                        underlined
                        type="password"
                    value={password}
                    onChange={onPasswordChange}
                    errorMessage={passwordErrorMessage}
                    />
                    <TextField
                        label={"Confirm password"}
                        styles={largeTextFieldStyles}
                        borderless
                        underlined
                        type="password"
                    value={confirm}
                    onChange={onConfirmPasswordChange}
                    errorMessage={confirmErrorMessage}
                    />
                    <DefaultButton text={'Register'} onClick={onRegisterClicked} styles={loginButtonStyle} />
                </div>
            </div>
            <div className={registerContainerClassName}>
                <h1 className={secondaryTitleClassName}>Already have an account?</h1>
                <h2 className={textClassName}>Go to login</h2>
                <DefaultButton text="Login" onClick={onLoginButtonClick} styles={registerButtonStyle} />
            </div>

        </div>
    </>)
}