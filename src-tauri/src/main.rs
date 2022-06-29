#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;
use tauri::{AboutMetadata, Menu, MenuItem, Submenu};

#[tauri::command]
fn execute_command(command: String) -> String {
  let output = if cfg!(target_os = "windows") {
    Command::new("cmd")
      .args(&["/C", &command])
      .output()
      .expect("failed to execute process")
  } else {
    Command::new("sh")
      .arg("-c")
      .arg(&command)
      .output()
      .expect("failed to execute process")
  };

  let hello = output.stdout;

  String::from_utf8(hello).unwrap()
}

fn main() {
  let menu = make_menu();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![execute_command])
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn make_menu() -> Menu {
  let main_submenu = Submenu::new(
    "Tinker 2",
    Menu::new()
      .add_native_item(MenuItem::About(
        "Tinker 2".to_string(),
        AboutMetadata::new(),
      ))
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
