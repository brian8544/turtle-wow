<?php

namespace App\Rules;

use App\Models\auth\GpHistory;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UsedGamepointsCode implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (GpHistory::where('code', $value)->first()) {
            $fail(__('page_donate')['exception']['already_used']);
        }
    }
}
