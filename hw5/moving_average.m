function y = moving_average(x)
persistent add cnt circBuff;
if isempty(add)
    add = 0;
    cnt = 0;
    buffSize = 25;
    circBuff = zeros(1,buffSize);
end
if cnt<25
circBuff = [circBuff(2:end) x]
S = sum(circBuff);
cnt = cnt + 1;
y = S / cnt
else
circBuff = [circBuff(2:end) x]
S = sum(circBuff);
y=S/25;
end