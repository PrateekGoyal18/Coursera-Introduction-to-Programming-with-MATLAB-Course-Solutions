function  mystr=censor(vec,str)
contains_str = false(1, length(vec));
for K = 1 : length(vec)
  if ~isempty(strfind(vec{K}, str))
    contains_str(K) = true;
  end
end
mystr = {};
for K = 1 : length(vec)
  if ~contains_str(K)
    mystr(end+1) = vec(K);
  end
end