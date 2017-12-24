%function integ=integerize(A)
%integ = 'none'; 
%maxValue=max(A(:));
%disp(maxValue);
%if maxValue <= intmax('uint8')
%integ='uint8';
%elseif maxValue<=intmax('uint16')
%integ='uint16';
%elseif maxValue <= intmax('uint32')
%integ='uint32'; 
%elseif maxValue <= intmax('uint64')
%integ='uint64';
%else
%integ='NONE';
%end
%end



function u = integerize(A)
g =max(max(A));
if (g>255 && g<=intmax('uint16'))
    u = 'uint16';
elseif (g<0 || g>intmax('uint64'))
    u = 'NONE';
elseif (g>intmax('uint16') && g<=intmax('uint32'))
    u = 'uint32';
elseif (g>intmax('uint32') && g<=intmax('uint64'))
    u = 'uint64';
else 
    u = 'uint8';
end