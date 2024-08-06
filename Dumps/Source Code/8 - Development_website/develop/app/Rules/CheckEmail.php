<?php

namespace App\Rules;

use App\Models\auth\EmailProviderBlacklist;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CheckEmail implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $email = substr(strrchr($value, '@'), 1);

        $emailProviderBlacklist = EmailProviderBlacklist::where('domain', $email)->first();

        if ($emailProviderBlacklist) {
            switch ($emailProviderBlacklist->banned) {
                case 1:
                    $fail(__('custom.invalid_email', ['email' => $value]));
                    break;
                case 2:
                    $fail(__('custom.unknown_provider', ['email' => $value, 'domain' => $email]));
                    break;
            }
        }
    }
}
