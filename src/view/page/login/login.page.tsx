import { Link } from "react-router-dom"
import MyButton from "../../components/common/form/my-button"
import { MyInputWithRHF } from "../../components/common/form/my-input.comp"
import MySpacer from "../../components/common/my-spacer"
import MyTitle from "../../components/common/my-title"
import { useLoginController } from "./login.controller"

export default function LoginPage() {
    const { control, handleSubmit, isSubmitting } = useLoginController()

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-2/3 lg:w-2/5 my-auto md:m-auto md:bg-gray-50 p-10 rounded-xl relative">
                <div className="absolute -top-2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    {/* <img src={StaticImageList.LOGO} alt="" className="w-40 h-fit" /> */}
                </div>
                <MyTitle title="Sign in to your account" className="text-center" />
                <MySpacer className="h-4" />
                <p className="text-center text-[#556987]">Fill your sign details</p>
                <MySpacer className="h-4 md:h-6" />

                <div className="grid gap-4">
                    <MyInputWithRHF
                        control={control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter Your Email"
                    />
                    <MyInputWithRHF
                        control={control}
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter Your Password"
                    />

                    <div className="flex justify-between">
                        <div></div>
                        <div>
                            <p className="text-primary text-sm font-semibold">
                                <Link to={""}>Forgot your password?</Link>
                            </p>
                        </div>
                    </div>

                    <MyButton
                        loading={isSubmitting}
                        onClick={async () => {
                            await handleSubmit()
                        }}
                        className="w-full"
                    >
                        Sign In
                    </MyButton>
                    {/* <div>
                        <p className="text-textSecondary dark:text-textSecondaryIn-dark text-sm font-normal text-center">
                            Don’t have an account?{" "}
                            <Link to={"/register"} className="underline">
                                Sign up
                            </Link>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
