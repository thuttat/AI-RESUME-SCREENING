import { Check, Save } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../components/Button.jsx';

export default function ConfigSettingsCard({ config, setConfig, onSave, isLoading, isSaved }) {
  return (
    <div className="!bg-white !border !border-slate-200 !rounded-2xl !p-7 !shadow-sm">
      <h2 className="!text-slate-800 !font-bold !text-lg !tracking-wide !mb-5 !m-0">
        AI Provider Settings
      </h2>

      <div className="!space-y-5">
        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
            AI Provider Model
          </label>
          <select
            value={config.provider || 'gpt-4o-mini'}
            onChange={(e) => setConfig({ ...config, provider: e.target.value })}
            className="!w-full !px-4 !py-2.5 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 focus:!border-blue-500 !text-[14px] !text-slate-800 !bg-white !cursor-pointer"
          >
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
            <option value="claude-3-sonnet">Claude 3 Sonnet</option>
            <option value="claude-3-haiku">Claude 3 Haiku</option>
          </select>
        </div>

        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
            API Key
          </label>
          <input
            type="password"
            value={config.apiKey || ''}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            className="!w-full !px-4 !py-2.5 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 focus:!border-blue-500 !text-[14px] !text-slate-800 !bg-white"
            placeholder="Enter your API key"
          />
          <p className="!text-[12px] !text-slate-500 !mt-2 !m-0">
            Your API key is encrypted and stored securely
          </p>
        </div>

        <div className="!pt-2">
          <Button
            variant="primary"
            icon={isSaved ? Check : Save}
            onClick={onSave}
            className={clsx(
              '!px-5 !py-2.5 !shrink-0 !transition-colors',
              isSaved ? '!bg-green-600 hover:!bg-green-700' : ''
            )}
          >
            {isLoading ? 'Saving...' : isSaved ? 'Configuration Saved' : 'Save Configuration'}
          </Button>
        </div>
      </div>
    </div>
  );
}