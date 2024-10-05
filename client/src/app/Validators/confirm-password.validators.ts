import { FormGroup } from "@angular/forms"

export const confirmPasswordValidator = (passwordControl:string, confirmPasswordControl:string) => {
    return (formGroup: FormGroup)=>{
        let password = formGroup.controls[passwordControl];
        let confirmPassword = formGroup.controls[confirmPasswordControl];

        if (confirmPassword.errors && !confirmPassword.errors['confirmPasswordValidator']) {
            return;
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({confirmPasswordValidator:true});
        }else{
            confirmPassword.setErrors(null);
        }
    }
}