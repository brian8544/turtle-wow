<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class ReservedNames implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $caseInsensitiveValue = mb_strtolower($value);
        $nameInLowerCase = DB::connection('mysql2')
            ->table('account_transfer_names')
            ->select(DB::raw('LOWER(name) as name'))
            ->whereRaw('LOWER(name) = ?', [$caseInsensitiveValue])
            ->first();

        if ($nameInLowerCase) {
            $fail(__('register_modal')['exception']['reserved_name']);
        }
    }
}
