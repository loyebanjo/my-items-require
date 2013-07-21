<?php 

	$db = mysql_connect('localhost', 'root', 'password');

	if(isset($db)) {
		mysql_select_db('itemsdb');

		$items;

		if($_SERVER['REQUEST_METHOD'] === 'GET') {
			$id = array_key_exists('id', $_GET) ? $_GET['id'] : null;

			if(isset($id)) {
				$items = mysql_query('SELECT * FROM itemstable WHERE id =' . $id);
			}
			else {
				$items = mysql_query('SELECT * FROM itemstable');
			}

			if(isset($items)) {
				$rows = mysql_num_rows($items);

				if($rows > 1) {
					$index=0;
					$_items = array();
					while($index < mysql_num_rows($items)) {
						$item = mysql_fetch_row($items);
						$_items[] = array(
							'id'                          => $item[0],
							'item_name'          => $item[1],
							'item_type'            => $item[2],
							'item_description' => $item[3]
						);
						$index++;
					}
					echo json_encode($_items);
				}
				else {
					echo json_encode(mysql_fetch_assoc($items));
				}
			}
		}
		else if($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
			$id                          = array_key_exists('id', $_GET) ? $_GET['id'] : null;
			$itemName           = array_key_exists('item_name', $_GET) ? $_GET['item_name'] : null;
			$itemType             = array_key_exists('item_type', $_GET) ? $_GET['item_type'] : null;
			$itemDescription = array_key_exists('item_description', $_GET) ? $_GET['item_description'] : null;

			if(isset($id) && isset($itemName) && isset($itemType) && isset($itemDescription)) {
				mysql_query('UPDATE itemstable SET item_name=\'' . $itemName . '\', item_type=\'' . $itemType . '\', item_description=\'' . $itemDescription . '\' WHERE id=\'' . $id . '\'');
				$items = mysql_query('SELECT * FROM itemstable WHERE id = ' . $id);
			}
			else if(isset($itemName) && isset($itemType) && isset($itemDescription)) {
				mysql_query('INSERT INTO itemstable (item_name, item_type, item_description) VALUES (\'' . $itemName . '\', ' . '\'' . $itemType . '\', ' . '\'' . $itemDescription . '\')');
				$items = mysql_query('SELECT * FROM itemstable WHERE id = ' . mysql_insert_id());
			}

			echo json_encode(mysql_fetch_assoc($items));
		}
		else if($_SERVER['REQUEST_METHOD'] === 'DELETE') {
			$id  = array_key_exists('id', $_GET) ? $_GET['id'] : null;

			if(isset($id)) {
				mysql_query('DELETE FROM itemstable WHERE id=\'' . $id . '\'');

				$items = array('id' => $id);

				echo json_encode($items);
			}
		}

		mysql_close($db);
	}
	else {
		die('Could not connect to the server');
	}

?>