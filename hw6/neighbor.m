function [A]=neighbor(v)
if isvector(v) && length(v)>=2 % checking whether v is a vector and have two elements
 %for i=1:length(v)
 %     A=v(i+1)-v(i); % getting the absolute values of v(i+1)-v(i)   
% end
A = abs(v(2:end) - v(1:end-1));
else
   A=[];
end
end



%function d = neighbor(v)
%for ii = 1:length(v)-1
%   d(ii) =  abs(v(ii+1) - v(ii));
%   end
%   end