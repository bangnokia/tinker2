#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{Menu, MenuItem, Submenu};

fn main() {
  let menu = make_menu();

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| {
        match event.menu_item_id() {
            "license" => {
                println!("clicked on license menu");
            }
            _ => {}
        }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn make_menu() -> Menu {
  let main_submenu = Submenu::new(
    "Tinker 2",
    Menu::new()
      .add_native_item(MenuItem::About("Tinker 2".to_string()))
      .add_native_item(MenuItem::EnterFullScreen)
      .add_native_item(MenuItem::Quit),
  );

  let file_submenu = Submenu::new(
    "File",
    Menu::new()
      .add_native_item(MenuItem::Minimize)
      .add_native_item(MenuItem::Quit),
  );

  let edit_submenu = Submenu::new(
    "Edit",
    Menu::new()
      .add_native_item(MenuItem::Undo)
      .add_native_item(MenuItem::Redo)
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::Cut)
      .add_native_item(MenuItem::Copy)
      .add_native_item(MenuItem::Paste)
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::SelectAll),
  );

  Menu::new()
    .add_submenu(main_submenu)
    .add_submenu(file_submenu)
    .add_submenu(edit_submenu)
}
