export default function TestDarkMode() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dark Mode Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-white dark:bg-gray-900 border rounded">
          <p className="text-gray-900 dark:text-gray-100">
            This should have a dark background in dark mode (using dark:bg-gray-900)
          </p>
        </div>
        
        <div className="p-4 bg-white dark:bg-slate-900 border rounded">
          <p className="text-gray-900 dark:text-slate-100">
            This should have a dark background in dark mode (using dark:bg-slate-900)
          </p>
        </div>
        
        <div className="p-4 bg-white dark:bg-black border rounded">
          <p className="text-gray-900 dark:text-white">
            This should have a black background in dark mode (using dark:bg-black)
          </p>
        </div>
        
        <div className="p-4" style={{ backgroundColor: 'white' }}>
          <p className="dark:hidden">You're in LIGHT mode (if you see this)</p>
          <p className="hidden dark:block">You're in DARK mode (if you see this)</p>
        </div>
      </div>
    </div>
  );
}