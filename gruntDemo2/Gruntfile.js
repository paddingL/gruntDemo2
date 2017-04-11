module.exports = function(grunt){
    //初始化grunt 配置
    grunt.initConfig({
 
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        //压缩js
        uglify:{
            options:{
                /*stripBanners:true, //合并时允许输出头部信息*/
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                files:[{
                    expand:true,
                    cwd:'src/js/',
                    src:'**/*.js',
                    dest:'dist/js/',
                    rename:function(dest,src){
                        var folder=src.substring(0,src.lastIndexOf('/'));
                        var fieldname=src.substring(src.lastIndexOf('/'),src.length);
                        fieldname=fieldname.substring(0,fieldname.lastIndexOf('.'));
                        var fileresult=dest + folder + fieldname + '.min.js';
                        return fileresult;
                    }

                }]
    
            }
        },
 
        jshint:{
            options:{
                jshintrc:'.jshint'
            },
            build:['Gruntfile.js','src/js/*js']
        },
 
        
        //watch自动化
        watch:{
            build:{
                files:['src/js/*.js'],
                tasks:['jshint','uglify'],
                options:{spawn:false}
            }
        }
 
    });
    //告诉grunt我们将使用插件
 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    //告诉grunt当我们在终端输入grunt时需要做些什么
    grunt.registerInitTask('default',['jshint','uglify','watch']);
    //先进行语法检查，如果没有问题，再合并，再压缩
};