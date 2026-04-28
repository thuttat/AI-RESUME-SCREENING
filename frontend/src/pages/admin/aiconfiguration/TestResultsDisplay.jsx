import { AlertCircle } from 'lucide-react';

export default function TestResultsDisplay({ testResult }) {
  if (!testResult) return null;

  return (
    <div className="!mt-8">
      <div className="!flex !items-center !gap-3 !mb-4">
        <span className="!text-[#ff4d4f] !font-bold !text-[12px] !uppercase !tracking-[0.1em]">
          Test Results
        </span>
        {testResult.status === 'success' && (
          <span className="!text-green-600 !text-[13px] !font-medium">
            ● Processing successful
          </span>
        )}
      </div>

      <div className="!bg-[#1e1e1e] !text-white !rounded-xl !p-6 !overflow-x-auto">
        <pre className="!text-[13px] !font-mono !whitespace-pre-wrap !leading-relaxed !m-0">
          {JSON.stringify(testResult.data, null, 2)}
        </pre>
      </div>

      <div className="!mt-5 !p-5 !bg-blue-50/50 !border !border-blue-100 !rounded-xl">
        <div className="!flex !items-start !gap-3">
          <AlertCircle size={22} className="!text-blue-600 !shrink-0 !mt-0.5" />
          <div className="!w-full">
            <h4 className="!font-bold !text-[15px] !text-blue-900 !mb-1.5 !m-0">Analysis Summary</h4>
            <p className="!text-[14px] !text-blue-800 !leading-relaxed !m-0">
              {testResult.data.summary}
            </p>
            
            <div className="!mt-4 !flex !items-center !gap-3">
              <span className="!text-[13px] !font-bold !text-blue-900">Match Score:</span>
              <div className="!flex-1 !max-w-xs !h-2.5 !bg-blue-200/70 !rounded-full !overflow-hidden">
                <div
                  className="!h-full !bg-blue-600 !transition-all !duration-500 !rounded-full"
                  style={{ width: `${testResult.data.match_score * 100}%` }}
                ></div>
              </div>
              <span className="!text-[14px] !font-bold !text-blue-900">
                {(testResult.data.match_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}