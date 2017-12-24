%Both the functions are good to go

%function [s1 s2 sums] = sines(pts,amp,n1,n2)
%if nargin
%if nargin
%if nargin
%if nargin
%t = 0 : 2*pi/(pts-1) : 2*pi;
%s1 = amp * sin(f1*t);
%s2 = amp * sin(f2*t);
%sums = s1 + s2;
%end
%end
%end
%end
% The sin() function has a full period between 0 and 2*pi.
% To set up the vector t, dividing by (pts-1) is needed
% because n points in a line define (n-1) consecutive segments
% and not n. For example, two points define a single line segment.
% The function call sin(f1*t) will create exactly f1 full periods
% using vector t defined above.


%n = pts-1;
%t = 0:n;
%s1 = amp*sin(2*pi*n1/n*t);
%s2 = amp*sin(2*pi*n2/n*t);
%sums = s1 + s2;
%end



function [s1, s2, sums] = sines(pts,amp,f1,f2)
if nargin==3 
    f2=1.05*f1; 
end 
if nargin==2 
    f1=100; 
    f2=1.05*f1; 
end 
if nargin==1 
    amp=1; 
    f1=100; 
    f2=1.05*f1; 
end 
if nargin<1 
    pts=1000;
    amp=1; 
    f1=100; 
    f2=1.05*f1; 
end 
t = linspace(0, 1, pts); 
s1=ampsin(2*pif1*t); 
s2=ampsin(2*pif2*t); 
sum=s1+s2; 
plot(sum);
end