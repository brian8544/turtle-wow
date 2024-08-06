<?php

namespace App\Livewire;

use App\Models\auth\PendingCommand;
use App\Models\auth\WorldConfig;
use Livewire\Attributes\On;
use Livewire\Component;

class Config extends Component
{
    public $realms = [];
    public $selectedRealm = 0;
    public $message = '';

    public function mount()
    {
        $worldConfig = WorldConfig::select(
            'realm_id',
            'compression',
            'login_queue_grace_period_secs',
            'character_screen_max_idle_time',
            'player_hard_limit',
            'antiflood_sanction',
            'packet_bcast_threads',
            'packet_bcast_frequency',
            'mailspam_expire_secs',
            'mailspam_max_mails',
            'mailspam_level',
            'mailspam_account_level',
            'mailspam_money')->get()->toArray();

        foreach ($worldConfig as $config) {
            $this->realms[$config['realm_id']] = $config;
        }

        $this->selectedRealm = key($this->realms);
    }

    public function setRealm($realmId)
    {
        $this->selectedRealm = $realmId;
        $this->message = '';
        $this->render();
    }

    #[On('updateVariable')]
    public function updateVariable($variable, $value)
    {

        $this->message = '';
        $text = __('custom.success_edit_world_config', ['variable' => $variable, 'oldValue' => $this->realms[$this->selectedRealm][$variable], 'newValue' => $value]);
        $worldConfig = WorldConfig::where('realm_id', $this->selectedRealm)->first();
        $worldConfig->$variable = $value;
        $this->realms[$this->selectedRealm][$variable] = $value;
        $worldConfig->save();
        $this->message = $text;
        $this->render();
    }

    public function reloadConfig()
    {
        $this->message = '';
        $text = __('custom.success_reload_config', ['realm' => config('customs.realms')[$this->selectedRealm]['name']]);
        $pendingCommand = PendingCommand::create([
            'realm_id' => $this->selectedRealm,
            'command' => 'reload config',
            'run_at_time' => 0
        ]);

        if ($pendingCommand) {
            $this->message = $text;
        }
    }

    public function render()
    {
        return view('livewire.config');
    }
}
