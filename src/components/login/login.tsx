import { DefaultButton, Spinner, SpinnerSize, TextField } from "@fluentui/react"
import { backgroundContainerClassName, backgroundImageClassName, errorClassName, fieldsContainerClassName, loginButtonStyle, loginContainerClassName, logoImageClassName, registerButtonStyle, registerContainerClassName, secondaryTitleClassName, textClassName, textFieldStyles, titleClassName } from "./login.styles"
import { LOGIN_BUTTON_TEXT, PASSWORD_FIELD_LABEL, USERNAME_FIELD_LABEL } from "../../library/constants"
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import { UserLogin } from "../../models/User";
import { ILoginProps } from "./login.types";

export const Login = (props: ILoginProps): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const navigate: NavigateFunction = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [displayError, setDisplayError] = useState<boolean>(false);
    const [user, setUser] = useState<UserLogin>({ email: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);

    const onRegisterButtonClick = (): void => {
        navigate('/register');
    };

    const onUsernameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setDisplayError(false);
        setEmail(newValue ?? "");
    };

    const onPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
        setDisplayError(false);
        setPassword(newValue ?? "");
    };

    useEffect(() => {
        setUser({ email: email, password: password });
    }, [email, password]);

    const onLoginButtonClick = (): void => {
        if (!email || !password)
            return;
        setLoading(true);
        services.AuthenticationService.Login(user).then(u => {
            if (u.Error !== undefined) {
                setDisplayError(true)
                setLoading(false);
                return;
            }
            if (u.Data !== undefined) {
                props.onUserAuthenticated();
                setLoading(false);
                return;
            }
            setLoading(false);
            setDisplayError(true);
        })
            .catch(err => {
                setDisplayError(true);
                setLoading(false);
            });

    };

    return (<>
        <div className={backgroundContainerClassName}>
            <div className={loginContainerClassName}>
                <img src="../../../logo_recolored.png" className={logoImageClassName}></img>
                <img src="../../../background_graph_image.png" className={backgroundImageClassName}></img>
                <div className={fieldsContainerClassName}>
                    <h1 className={titleClassName}>Login</h1>
                    {displayError && <p className={errorClassName} style={{position: 'absolute', top: '33%', left: '29%'}}>Wrong credentials.</p>}
                    <TextField
                        label={USERNAME_FIELD_LABEL}
                        styles={textFieldStyles}
                        borderless
                        underlined
                        value={email}
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
                        canRevealPassword
                    />
                    <DefaultButton text={LOGIN_BUTTON_TEXT} onClick={onLoginButtonClick} styles={loginButtonStyle} />
                    {loading && <Spinner style={{position: 'absolute', top: '33%', left: '45%'}} size={SpinnerSize.large} />}
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