export function InputBox({type, label, placeholder, onChange, value}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input type={type} onChange={onChange} placeholder={placeholder} value={value} className="w-full px-3 py-2 border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
    </div>
}