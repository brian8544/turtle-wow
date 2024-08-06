<?php

namespace App\Rules;

use App\Models\forum\PhpBBUser;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CheckForumUsername implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $account_forum_clean = strtolower($value);
        $account_forum = ucfirst($account_forum_clean);

        $phpBBUserGroup = PhpBBUser::where('username_clean', $account_forum_clean)
            ->orWhere('username', $account_forum)->first();

        if ($phpBBUserGroup) {
            $fail(__('register_modal')['exception']['existing_forum_username']);
        }
    }
}
