<?php

namespace App\Models\characters;

use App\Models\auth\Account;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Tag(
 *     name="Characters",
 *     description="Operations related to Characters database"
 * )
 */
/**
 * @OA\Schema(
 *     schema="Character",
 *     title="Character",
 *     description="Character model",
 *     @OA\Property(property="guid", type="integer", format="int32"),
 *     @OA\Property(property="account", type="integer", format="int32"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="race", type="integer", format="int32"),
 *     @OA\Property(property="class", type="integer", format="int32"),
 *     @OA\Property(property="gender", type="integer", format="int32"),
 *     @OA\Property(property="level", type="integer", format="int32"),
 *     @OA\Property(property="xp", type="integer", format="int32"),
 *     @OA\Property(property="money", type="integer", format="int32"),
 *     @OA\Property(property="playerBytes", type="integer", format="int32"),
 *     @OA\Property(property="playerBytes2", type="integer", format="int32"),
 *     @OA\Property(property="playerFlags", type="integer", format="int32"),
 *     @OA\Property(property="position_x", type="number", format="float"),
 *     @OA\Property(property="position_y", type="number", format="float"),
 *     @OA\Property(property="position_z", type="number", format="float"),
 *     @OA\Property(property="map", type="integer", format="int32"),
 *     @OA\Property(property="orientation", type="number", format="float"),
 *     @OA\Property(property="taximask", type="string"),
 *     @OA\Property(property="online", type="integer", format="int32"),
 *     @OA\Property(property="cinematic", type="integer", format="int32"),
 *     @OA\Property(property="totaltime", type="integer", format="int32"),
 *     @OA\Property(property="leveltime", type="integer", format="int32"),
 *     @OA\Property(property="logout_time", type="integer", format="int64"),
 *     @OA\Property(property="is_logout_resting", type="integer", format="int32"),
 *     @OA\Property(property="rest_bonus", type="number", format="float"),
 *     @OA\Property(property="resettalents_multiplier", type="integer", format="int32"),
 *     @OA\Property(property="resettalents_time", type="integer", format="int64"),
 *     @OA\Property(property="trans_x", type="number", format="float"),
 *     @OA\Property(property="trans_y", type="number", format="float"),
 *     @OA\Property(property="trans_z", type="number", format="float"),
 *     @OA\Property(property="trans_o", type="number", format="float"),
 *     @OA\Property(property="transguid", type="integer", format="int64"),
 *     @OA\Property(property="extra_flags", type="integer", format="int32"),
 *     @OA\Property(property="stable_slots", type="integer", format="int32"),
 *     @OA\Property(property="at_login", type="integer", format="int32"),
 *     @OA\Property(property="zone", type="integer", format="int32"),
 *     @OA\Property(property="death_expire_time", type="integer", format="int64"),
 *     @OA\Property(property="taxi_path", type="string"),
 *     @OA\Property(property="honorRankPoints", type="number", format="float"),
 *     @OA\Property(property="honorHighestRank", type="integer", format="int32"),
 *     @OA\Property(property="honorStanding", type="integer", format="int32"),
 *     @OA\Property(property="honorLastWeekHK", type="integer", format="int32"),
 *     @OA\Property(property="honorLastWeekCP", type="number", format="float"),
 *     @OA\Property(property="honorStoredHK", type="integer", format="int32"),
 *     @OA\Property(property="honorStoredDK", type="integer", format="int32"),
 *     @OA\Property(property="watchedFaction", type="integer", format="int32"),
 *     @OA\Property(property="drunk", type="integer", format="int32"),
 *     @OA\Property(property="health", type="integer", format="int32"),
 *     @OA\Property(property="power1", type="integer", format="int32"),
 *     @OA\Property(property="power2", type="integer", format="int32"),
 *     @OA\Property(property="power3", type="integer", format="int32"),
 *     @OA\Property(property="power4", type="integer", format="int32"),
 *     @OA\Property(property="power5", type="integer", format="int32"),
 *     @OA\Property(property="exploredZones", type="string"),
 *     @OA\Property(property="equipmentCache", type="string"),
 *     @OA\Property(property="ammoId", type="integer", format="int32"),
 *     @OA\Property(property="actionBars", type="integer", format="int32"),
 *     @OA\Property(property="deleteInfos_Account", type="integer", format="int32"),
 *     @OA\Property(property="deleteInfos_Name", type="string"),
 *     @OA\Property(property="deleteDate", type="integer", format="int64"),
 *     @OA\Property(property="area", type="integer", format="int32"),
 *     @OA\Property(property="world_phase_mask", type="integer", format="int32"),
 *     @OA\Property(property="customFlags", type="integer", format="int32"),
 *     @OA\Property(property="city_protector", type="integer", format="int32"),
 *     @OA\Property(property="regexFilterCount", type="integer", format="int32"),
 *     @OA\Property(property="isGMCharacter", type="integer", format="int32"),
 *     @OA\Property(property="ignore_titles", type="integer", format="int32"),
 *     @OA\Property(property="mortality_status", type="integer", format="int32"),
 *     @OA\Property(property="total_deaths", type="integer", format="int32"),
 *     @OA\Property(property="xp_gain", type="integer", format="int32"),
 * )
 */
class Character extends Model
{
    use HasFactory;

    protected $connection = 'mysql3';
    protected $table = 'characters';
    protected $primaryKey = 'guid';
    public $timestamps = false;

    protected $fillable = [
        'race',
        'class',
        'level',
        'active'
    ];

    public function user()
    {
        return $this->setConnection('mysql')->hasOne(Account::class, 'id', 'account');
    }

    public function homeBind($database)
    {
        return $this->setConnection($database)->hasOne(CharacterHomebind::class, 'guid', 'guid');
    }

    public function spellColldown($database)
    {
        return $this->setConnection($database)->hasMany(CharacterSpellCooldown::class, 'guid', 'guid');
    }

    public function canUnstuck($database)
    {
        if ($this->setConnection($database)->online == 1) {
            return "CHARACTER_ONLINE";
        }

        if ($this->spellColldown($database)->get()) {
            foreach ($this->spellColldown($database)->get() as $spell) {
                if ($spell->spell == 8690) {
                    return "HEARTHSTONE_CD";
                }
            }
        }

        return "CAN_UNSTUCK";
    }

    public function getUnstuckCdAttribute($database)
    {
        if ($this->canUnstuck($database) == "HEARTHSTONE_CD") {
            $spellCoolDown = CharacterSpellCooldown::on($database)->where('guid', $this->guid)->where('spell', 8690)->first();

            return $spellCoolDown->time;
        } else {
            return 0;
        }
    }

    public function getImage($database)
    {
        $connection = $this->setConnection($database);
        $image = '';

        switch ($connection->race) {
            case 1:
                $image = 'human';
                break;
            case 2:
                $image = 'orc';
                break;
            case 3:
                $image = 'dwarf';
                break;
            case 4:
                $image = 'nightelf';
                break;
            case 5:
                $image = 'undead';
                break;
            case 6:
                $image = 'tauren';
                break;
            case 7:
                $image = 'gnome';
                break;
            case 8:
                $image = 'troll';
                break;
            case 9:
                $image = 'goblin';
                break;
            case 10:
                $image = 'highelf';
                break;
        }

        $image .= ($connection->gender == 0) ? '-male' : '-female';

        return $image;
    }

    public function glyphs($database)
    {
        $glyphs = [
            50004,
            50000,
            50008
        ];

        return $this->setConnection($database)->hasMany(CharacterSpell::class, 'guid', 'guid')->whereIn('spell', $glyphs)->where('active', 1);
    }
}
