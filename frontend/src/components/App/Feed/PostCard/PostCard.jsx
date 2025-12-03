import { User } from 'lucide-react';

export default function PostCard({ fullName, username, content, date, likes }) {
  return (
    <div className="w-full max-w-2xl bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 flex flex-col gap-4 mx-auto">
      
      <div className="flex items-center gap-4">
    
        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
          <User className="w-6 h-6 text-gray-400" />
        </div>

        <div className="flex flex-col">
          <span className="text-white font-semibold tracking-wide">
            {fullName || "Nome"}
          </span>
          <span className="text-gray-400 text-sm">
            @{username || "username"}
          </span>
        </div>
      </div>

      <p className="text-gray-300 text-[15px] leading-relaxed">
        {content || `"Erro ao carregar o conteúdo do post. Por favor, tente novamente mais tarde."`}
      </p>

      <div className="flex justify-between items-center pt-2">
     
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <span className="text-gray-300 text-lg">♡</span>
          <span className="text-gray-400 text-sm">{likes}</span>
        </div>

        <span className="text-gray-500 text-xs">
          {date || "21/11/2025"}
        </span>
      </div>
    </div>
  );
}
