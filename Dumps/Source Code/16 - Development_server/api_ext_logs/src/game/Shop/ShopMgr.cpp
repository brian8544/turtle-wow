/*
 * Copyright (C) 2020-2021 Turtle WoW
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

#include "ShopMgr.h"
#include "World.h"
#include "ObjectMgr.h"
#include "ObjectGuid.h"
#include "Creature.h"
#include "Object.h"
#include "PoolManager.h"
#include "Language.h"
#include "Log.h"
#include "MapManager.h"
#include "BattleGroundMgr.h"
#include "MassMailMgr.h"
#include "SpellMgr.h"
#include "Policies/SingletonImp.h"
#include "Player.h"
#include "Chat.h"

ShopMgr::ShopMgr(Player* owner) : _owner(owner)
{
}

uint32 ShopMgr::GetBalance()
{
	QueryResult* coins_result = LoginDatabase.PQuery("SELECT `coins` FROM `shop_coins` WHERE `id` = '%u'", _owner->GetSession()->GetAccountId());

	if (!coins_result)
		LoginDatabase.PExecute("INSERT INTO shop_coins (id, coins) VALUES ('%u', 0)", _owner->GetSession()->GetAccountId());

	if (coins_result)
	{
		Field* fields = coins_result->Fetch();
		if (fields != nullptr) 
			return fields[0].GetUInt32();
	}
	return 0;
}

std::string ShopMgr::BuyItem(uint32 itemID)
{

	auto shopEntry = sObjectMgr.GetShopEntryInfo(itemID);

	if (!shopEntry)
		return "itemnotinshop";

	uint32 price = shopEntry->Price;
	
	int32 count = 1;
	ItemPosCountVec dest;
	uint32 noSpaceForCount = 0;
	uint8 msg = _owner->CanStoreNewItem(NULL_BAG, NULL_SLOT, dest, itemID, count, &noSpaceForCount);
	if (msg != EQUIP_ERR_OK)
		count -= noSpaceForCount;

	if (count == 0 || dest.empty())
		return "bagsfulloralreadyhaveitem";

	QueryResult* Result = LoginDatabase.PQuery("SELECT `coins` FROM `shop_coins` WHERE `id` = %u", _owner->GetSession()->GetAccountId());

	if (!Result)
		return "unknowndberror";

	Field* fields = Result->Fetch();

	uint32 coins = fields[0].GetUInt32();
	delete Result;

	if (coins > 0)
	{
		int32 newBalance = coins - price;

		if (newBalance >= 0)
		{
			LoginDatabase.BeginTransaction();

			bool successTransaction =
				LoginDatabase.PExecute("UPDATE `shop_coins` SET `coins` = %i WHERE `id` = %u", newBalance, _owner->GetSession()->GetAccountId()) &&
				LoginDatabase.PExecute("INSERT INTO `shop_logs` VALUES (NOW(), %u, %u, %u, %u, 0)", _owner->GetGUIDLow(), _owner->GetSession()->GetAccountId(), itemID, price);

			LoginDatabase.CommitTransaction();

			if (!successTransaction)
				return "dberrorcantprocess";

			Item* item = _owner->StoreNewItem(dest, itemID, true, Item::GenerateItemRandomPropertyId(itemID));
			_owner->SendNewItem(item, count, false, true);

			return "ok";
		}
		else
			return "notenoughtokens";
	}
	else
		return "notenoughtokens";

}