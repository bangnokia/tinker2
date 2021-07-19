import ServersPanel from "./panels/ServersPanel";

function Settings() {
    return (
        <div className="absolute left-0 top-0 h-full w-full backdrop-filter backdrop-blur-sm flex">
            <ServersPanel />
        </div>
    )
}

export default Settings;